"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

export default function Home() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        const data = e.target.rawdata.value
        try {
            const res = await fetch('http://0.0.0.0/api', {
                method: 'POST',
                body: JSON.stringify({ "data": data }),
                headers: { 'Content-Type': 'application/json' }
            })
            await res.json()
            router.push('/table')
        } catch (error) {
            console.error('Error processing data:', error)
            // Here you might want to show an error message to the user
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">CVC Data Processor</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit}>
                        <Textarea
                            id="rawdata"
                            className="min-h-[200px]"
                            placeholder="Paste raw data here"
                        />
                        <CardFooter className="flex justify-end pt-4">
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Processing...' : 'Process Data'}
                            </Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </main>
    )
}
