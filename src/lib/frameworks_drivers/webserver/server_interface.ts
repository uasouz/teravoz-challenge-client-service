export default interface IServer {
    registerRoutes(): any

    listen(port: number | string): string | object | null
}