import { User } from "next-auth";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/Avatar";
import type { AvatarProps } from "./ui/Avatar";
import Image from "next/image";
import { Icons } from "./Icons";

interface UserAvatarProps extends AvatarProps {
	user: Pick<User, "name" | "image">;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, ...props }) => {
	return (
		<Avatar {...props}>
			{user.image ? (
				<div className="relative aspect-square size-full">
					<Image
						width={40}
						height={40}
						src={user.image}
						alt="profile avatar"
						referrerPolicy="no-referrer"
						unoptimized
					/>
				</div>
			) : (
				<AvatarFallback>
					<span className="sr-only">{user?.name}</span>
					<Icons.user />
				</AvatarFallback>
			)}
		</Avatar>
	);
};

export default UserAvatar;
