import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export function LoadingFeed() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="p-4">
          <div className="flex gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[300px]" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
