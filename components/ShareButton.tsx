"use client"

export const ShareButton = ({ username }: { username: string }) => {
    const handleShare = () => {
        const url = `${window.location.origin}/u/${username}`
        navigator.clipboard.writeText(url);
    }

    return (
        <button onClick={handleShare} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Share Profile
        </button>
    )
}