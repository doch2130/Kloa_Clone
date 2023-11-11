import {SignJWT, jwtVerify, type JWTPayload} from 'jose';
import { JWT } from "next-auth/jwt"


export function getJwtSecretKey() {
  const secret = process.env.SECRET_KEY;
  if (!secret) {
    throw new Error("JWT Secret key is not matched");
  }
  return new TextEncoder().encode(secret);
}

export async function signJwtAccessToken(payload: JWTPayload):Promise<string> {
  try{
    const secret_key = process.env.SECRET_KEY;
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60* 60; // one hour

    const token = new SignJWT({...payload})
        .setProtectedHeader({alg: 'HS256', typ: 'JWT'})
        .setExpirationTime(exp)
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .sign(new TextEncoder().encode(secret_key));
    
    return token;
  } catch (error) {
    console.log(error);
    return '';
  }
}

export async function verifyJwt(token: JWT):Promise<JWTPayload | null> {
  try {
    
    if(typeof token.accessToken !== 'string') {
      return null;
    }

    const accessToken:string = token.accessToken;

    const { payload } = await jwtVerify(accessToken, getJwtSecretKey());
    // console.log('payload ', payload);
    return payload as JWTPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
}
