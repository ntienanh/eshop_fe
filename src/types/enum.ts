export enum ServiceName {
  User = "users",
  Product = "products",
  File = "upload/files",
}

export enum StatusCode {
  Success = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  Timeout = 408,
  ServerError = 500,
}

export enum HTTPMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Patch = "PATCH",
  Delete = "DELETE",
}

export enum Language {
  Angular = "Angular",
  React = "React",
  Vue = "Vue",
  Css = "Css",
  Html = "Html",
}
