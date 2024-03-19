import { NextResponse } from "next/server";
import { createWarehouse } from '../../business_logic/warehouseLogic';
import { warehouse_geometry } from '../../business_logic/warehouse_geometry.js';

export const POST = async (req) => {
    
    const {height, depth, width} = await req.json()
    
    console.log(height + " " + depth + " " + width)

    /*fs.writeFileSync('./test.txt', "height")*/
    const warehouse = createWarehouse(width, depth, height);
    console.log("Round 2:", warehouse.depth, warehouse.width, warehouse.height);
    
    return NextResponse.json({
        WS: warehouse
      }, {
        status: 200,
      })
}