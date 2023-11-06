import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
const handler = NextAuth({
    theme: {
        logo: "https://live.staticflickr.com/65535/53313920630_99c22e058b_t.jpg",
        buttonText: "Entrar com sua conta google!",
        brandColor: "#000",
        colorScheme: "light"
    },
    providers: [
        GoogleProvider({
            clientId: '690849227868-bfjbcprepqgu7od9ih3q59cjdvd8p7dl.apps.googleusercontent.com',
            clientSecret: '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',
        })
    ],
})

export { handler as GET, handler as POST }