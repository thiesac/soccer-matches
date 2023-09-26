// class HTTPStatusMapper {
//   private statusHTTPMap: Record<string, number> = {
//     INVALID_DATA: 400,
//     UNAUTHORIZED: 401,
//     NOT_FOUND: 404,
//   };

//   getStatusHTTP(status: string): number {
//     return this.statusHTTPMap[status] ?? 500;
//   }
// }

// // Usage
// const mapper = new HTTPStatusMapper();
// const httpStatus = mapper.getStatusHTTP("INVALID_DATA"); // Returns 400
