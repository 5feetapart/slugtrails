import { readable, type Subscriber } from 'svelte/store'
import { getDoc, getFirestore, doc, setDoc, onSnapshot, collection } from 'firebase/firestore'
import type { DocumentData } from 'firebase/firestore'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { goto } from '$app/navigation'
import { app } from '../firebase' // import firebase app
import type { BasicUser, User } from '$lib/User'
import { createUserDoc } from './db'

export const auth = getAuth(app)

const user = readable<BasicUser | null | undefined>(undefined, (set) => {
	const unsubscribe = onAuthStateChanged(auth, async (user) => {
		if (user) {
			set({
				uid: user.uid,
				email: user.email || '',
				displayName: user.displayName || ''
			})
		} else {
			set(null)
		}
	})
	return () => {
		unsubscribe()
	}
})

export const userData = readable<User | null | undefined>(undefined, (set) => {
	let unsub = () => {}
	user.subscribe(
		async (user) => {
			if (!user) {
				return
			}
			const userDoc = createUserDoc(user.uid)
			await new Promise<void>((resolve) => {
				getDoc(userDoc)
					.then((doc) => {
						if (!doc.exists()) {
							setDoc(userDoc, {
								visited: {}
							})
						}
						resolve()
					})
					.catch((error) => {
						setDoc(userDoc, {
							visited: {}
						})
						resolve()
					})
			})
			unsub = onSnapshot(userDoc, (doc) => {
				set({
					...doc.data(),
					uid: user.uid,
					email: user.email || '',
					displayName: user.displayName || ''
				})
			})
		},
		() => {
			unsub()
			if (!user) {
				set(null)
			}
		}
	)
	return () => {
		unsub()
	}
})
