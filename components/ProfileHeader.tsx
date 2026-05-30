
export const ProfileHeader = ({ username, name, avatarUrl, bio, publicRepos, followers, following }: { username: string; name: string; avatarUrl: string; bio: string; publicRepos: number; followers: number; following: number }) => {

    return(
        <div className="flex items-center space-x-4 p-4 border-b border-[#30363d] bg-[#161b22]">
            <img src={avatarUrl} alt={`${username}'s avatar`} className="w-24 h-24 rounded-lg border border-gray-600" />
            <div>
                <h1 className="text-2xl font-bold">{name}</h1>
                <p className="text-lg text-gray-400">@{username}</p>
                <p className="text-gray-300">{bio || ''}</p>
                <div className="flex space-x-6 mt-3">
                    {[
                        { label: "Repos", value: publicRepos },
                        { label: "Followers", value: followers },
                        { label: "Following", value: following },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <p className="text-xl font-bold text-white">{stat.value}</p>
                            <p className="text-xs text-gray-400">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}