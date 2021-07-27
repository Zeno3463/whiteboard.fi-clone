import React from 'react'
import { useRouter } from "next/router"
import Room from "../components/room"

export default function id() {

	/// VARIABLE DECLARATION ///
	const router = useRouter();
	const {id} = router.query;
	const data: any = id?.toString().split("+");
	
	return <Room roomId={data[0]} isTeacher={data[1] === "1" ? true : false} userName={data[2]} />
}
