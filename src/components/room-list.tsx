import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRooms } from "@/http/use-rooms";
import { dayjs } from "@/lib/dayjs";

export function RoomList() {
  const { data, isLoading } = useRooms();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Rooms</CardTitle>
        <CardDescription>
          Quick access to recently created rooms
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-3'>
        {isLoading && <div>Loading rooms...</div>}
        {data?.map((room) => {
          return (
            <Link
              className='flex items-center justify-between rounded-lg border p-3 hover:bg-accent/50'
              key={room.id}
              to={`/room/${room.id}`}
            >
              <div className='flex flex-1 flex-col gap-1'>
                <h3 className='font-medium'>{room.name}</h3>
                <div className='flex items-center gap-2'>
                  <Badge className='text-xs' variant='secondary'>
                    {dayjs(room.createdAt).toNow()}
                  </Badge>

                  <Badge className='text-xs' variant='secondary'>
                    {room.questionsCount === 1
                      ? `${room.questionsCount} question`
                      : `${room.questionsCount} questions`}
                  </Badge>
                </div>
              </div>

              <span className='flex items-center gap-1 text-sm'>
                Entrar
                <ArrowRight className='size-3' />
              </span>
            </Link>
          );
        })}
      </CardContent>
    </Card>
  );
}
