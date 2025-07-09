import { CreateRoomForm } from "@/components/create-room-form";
import { RoomList } from "@/components/room-list";

export function CreateRoom() {
  return (
    <main className='min-h-screen px-4 py-8'>
      <div className='mx-auto max-w-4xl'>
        <div className='grid grid-cols-2 items-start gap-8'>
          <CreateRoomForm />
          <RoomList />
        </div>
      </div>
    </main>
    // <main>
    //   <div>Create Room</div>
    //   <br />

    //   {isLoading && <p>Loading...</p>}
    //   <div className='flex flex-col gap-2'>
    //     {data?.map((room) => {
    //       return (
    //         <Link key={room.id} to={`room/${room.id}`}>
    //           {room.name}
    //         </Link>
    //       );
    //     })}
    //   </div>
    //   <Link className='underline' to='/room'>
    //     Acessar sala
    //   </Link>
    // </main>
  );
}
