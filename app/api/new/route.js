import { NextResponse } from "next/server";

export const POST = async (req) => {
    
    const {height, depth, width} = await req.json()
    
    console.log(height + " " + depth + " " + width)

    /*fs.writeFileSync('./test.txt', "height")*/
    
    return NextResponse.json({
        message: "OK"
      }, {
        status: 200,
      })
}