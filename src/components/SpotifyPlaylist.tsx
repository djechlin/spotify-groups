import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function SpotifyPlaylist() {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Spotify Top Hits</CardTitle>
            </CardHeader>
            <CardContent>
                <iframe
                    src="https://open.spotify.com/embed/playlist/3N5j5nu5pUVS6QfkZO119i"
                    width="100%"
                    height="380"
                    frameBorder="0"
                    allow="encrypted-media"
                ></iframe>
            </CardContent>
        </Card>
    )
}

