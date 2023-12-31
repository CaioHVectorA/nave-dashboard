const profs: { email: string, name: string }[] = [
    { email: 'caihebatista@gmail.com', name: 'igor' }
]

export const findProfByEmail = (email: string) => {
    return profs.find(prof => prof.email === email)?.name
}  