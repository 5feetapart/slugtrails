export type UserDoc = {
	visited?: { [thumbnailId: string]: { locationId: string; date: Date; thumbnailId: string } }
}

export type BasicUser = {
	uid: string
	email?: string
	displayName?: string
}

export type User = BasicUser & UserDoc
