// api root
export const apiRoot =
  process.env.NODE_ENV === "production"
    ? "https://jibannet.online/api"
    : "https://jibannet.online/api-dev";

// export const folderRoot = "/"; // sub folder '/kbase-dev/'
// folder root
export const folderRoot = process.env.NODE_ENV === "production" ? "/" : "/";
// cdn root
export const cdnRoot =
  process.env.NODE_ENV === "production"
    ? "https://jibannet.online/api/"
    : "https://jibannet.online/api-dev/";

// image root
export const imageRoot =
  process.env.NODE_ENV === "production"
    ? `${cdnRoot}/src/uploads/`
    : `${cdnRoot}src/uploads/`;

// export const apiGeocode = "http://jinos.online/geocode";
export const apiGeocode =
  process.env.NODE_ENV === "production"
    ? "https://jiban.earth/b2c-api/geocode"
    : "http://jiban.earth/b2c-api-dev/geocode";
export const apiZipcode = "https://api.zipaddress.net";
