import { Module } from "@nestjs/common";
import { ClientProxyTechShop } from "./client-proxy";

@Module({
    providers:[ClientProxyTechShop],
    exports:[ClientProxyTechShop]
})

export class ProxyModule {}