export interface Publisher {
    publish(topic: string,message: any): any
}