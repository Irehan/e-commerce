// D:\web-dev\nextjs-tut\e-commerce\app\components\SkeletonProductCard.jsx
export default function SkeletonProductCard() {
    return (
        <div className="bg-white rounded-2xl shadow p-4 space-y-4">
            <div className="h-48 w-full rounded-xl bg-slate-200 shimmer" />
            <div className="h-6 w-3/4 rounded bg-slate-200 shimmer" />
            <div className="h-4 w-1/2 rounded bg-slate-200 shimmer" />
            <div className="h-8 w-full rounded bg-slate-200 shimmer" />
        </div>
    )
}
