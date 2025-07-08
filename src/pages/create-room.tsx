import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

type GetRoomsAPIRespose = Array<{
  id: string;
  name: string;
}>;

export function CreateRoom() {
  const { data, isLoading } = useQuery({
    queryKey: ["get-rooms"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3333/rooms");
      const result: GetRoomsAPIRespose = await response.json();
      return result;
    },
  });
  return (
    <main>
      <div>Create Room</div>
      <br />

      {isLoading && <p>Loading...</p>}
      <div className='flex flex-col gap-2'>
        {data?.map((room) => {
          return (
            <Link key={room.id} to={`room/${room.id}`}>
              {room.name}
            </Link>
          );
        })}
      </div>
      <Link className='underline' to='/room'>
        Acessar sala
      </Link>
    </main>
  );
}
