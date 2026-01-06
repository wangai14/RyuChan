import { toBase64Utf8, getRef, createTree, createCommit, updateRef, createBlob, type TreeItem } from '@/lib/github-client'
import { fileToBase64NoPrefix, hashFileSHA256 } from '@/lib/file-utils'
import { getAuthToken } from '@/lib/auth'
import { GITHUB_CONFIG } from '@/consts'
import type { ImageItem, PublishForm } from '../types'
import { getFileExt, formatDateTimeLocal } from '@/lib/utils'
import { toast } from 'sonner'
import { stringifyFrontmatter } from '@/lib/frontmatter'

export type PushBlogParams = {
	form: PublishForm
	cover?: ImageItem | null
	images?: ImageItem[]
	mode?: 'create' | 'edit'
	originalSlug?: string | null
}

export async function pushBlog(params: PushBlogParams): Promise<void> {
	const { form, cover, images, mode = 'create', originalSlug } = params

	if (!form?.slug) throw new Error('需要 slug')

	// if (mode === 'edit' && originalSlug && originalSlug !== form.slug) {
	// 	throw new Error('编辑模式下不支持修改 slug，请保持原 slug 不变')
	// }

	const token = await getAuthToken()
    const toastId = toast.loading('正在初始化发布...')

    try {
        toast.loading('正在获取分支信息...', { id: toastId })
        const refData = await getRef(token, GITHUB_CONFIG.OWNER, GITHUB_CONFIG.REPO, `heads/${GITHUB_CONFIG.BRANCH}`)
        const latestCommitSha = refData.sha

        const commitMessage = mode === 'edit' ? `更新文章: ${form.slug}` : `新增文章: ${form.slug}`

        const allLocalImages: Array<{ img: Extract<ImageItem, { type: 'file' }>; id: string }> = []

        for (const img of images || []) {
            if (img.type === 'file') {
                allLocalImages.push({ img, id: img.id })
            }
        }

        if (cover?.type === 'file') {
            allLocalImages.push({ img: cover, id: cover.id })
        }

        toast.loading('正在准备文件...', { id: toastId })

        const uploadedHashes = new Set<string>()
        let mdToUpload = form.md
        let coverPath: string | undefined

        const treeItems: TreeItem[] = []

        if (allLocalImages.length > 0) {
            toast.loading(`共需上传 ${allLocalImages.length} 张图片...`, { id: toastId })
            let idx = 1
            for (const { img, id } of allLocalImages) {
                toast.loading(`正在上传第 ${idx++}/${allLocalImages.length} 张图片...`, { id: toastId })
                const hash = img.hash || (await hashFileSHA256(img.file))
                const ext = getFileExt(img.file.name)
                const filename = `${hash}${ext}`
                const publicPath = `/images/${form.slug}/${filename}`

                if (!uploadedHashes.has(hash)) {
                    const path = `public/images/${form.slug}/${filename}`
                    const contentBase64 = await fileToBase64NoPrefix(img.file)
                    const blobData = await createBlob(token, GITHUB_CONFIG.OWNER, GITHUB_CONFIG.REPO, contentBase64, 'base64')
                    treeItems.push({
                        path,
                        mode: '100644',
                        type: 'blob',
                        sha: blobData.sha
                    })
                    uploadedHashes.add(hash)
                }

                const placeholder = `local-image:${id}`
                mdToUpload = mdToUpload.split(`(${placeholder})`).join(`(${publicPath})`)

                if (cover?.type === 'file' && cover.id === id) {
                    coverPath = publicPath
                }
            }
        }

        if (cover?.type === 'url') {
            coverPath = cover.url
        }

        toast.loading('正在创建文章内容...', { id: toastId })

        const dateStr = form.date || formatDateTimeLocal()
        const frontmatter = {
            title: form.title,
            description: form.summary,
            pubDate: dateStr,
            image: coverPath,
            draft: form.hidden,
            tags: form.tags,
            categories: form.categories,
            badge: form.badge
        }
        const finalContent = stringifyFrontmatter(frontmatter, mdToUpload)

        toast.loading('正在上传文章内容...', { id: toastId })
        const mdBlob = await createBlob(token, GITHUB_CONFIG.OWNER, GITHUB_CONFIG.REPO, toBase64Utf8(finalContent), 'base64')
        treeItems.push({
            path: `src/content/blog/${form.slug}.md`,
            mode: '100644',
            type: 'blob',
            sha: mdBlob.sha
        })

        toast.loading('正在创建文件树...', { id: toastId })
        const treeData = await createTree(token, GITHUB_CONFIG.OWNER, GITHUB_CONFIG.REPO, treeItems, latestCommitSha)

        toast.loading('正在创建提交...', { id: toastId })
        const commitData = await createCommit(token, GITHUB_CONFIG.OWNER, GITHUB_CONFIG.REPO, commitMessage, treeData.sha, [latestCommitSha])

        toast.loading('正在更新分支...', { id: toastId })
        await updateRef(token, GITHUB_CONFIG.OWNER, GITHUB_CONFIG.REPO, `heads/${GITHUB_CONFIG.BRANCH}`, commitData.sha)

        toast.success('发布成功！请等待部署完成后刷新页面', { id: toastId })
    } catch (error: any) {
        console.error(error)
        toast.error(error.message || '发布失败', { id: toastId })
        throw error
    }
}
