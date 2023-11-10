import jwt, { JwtPayload } from "jsonwebtoken"
import {SignJWT, jwtVerify, type JWTPayload} from 'jose';

interface SignOption {
  expiresIn?: string | number;
}

const DEFAULT_SIGN_OPTION: SignOption = {
  expiresIn: "1h",
};

// 토큰 생성 함수
export function signJwtAccessToken(payload: JwtPayload, options: SignOption = DEFAULT_SIGN_OPTION) {
  const secret_key = process.env.SECRET_KEY;
  const token = jwt.sign(payload, secret_key!, options);
  return token;
}

// 토큰 검증 함수
export function verifyJwt(token: string) {
  try {
    const secret_key = process.env.SECRET_KEY;
    const decoded = jwt.verify(token, secret_key!);
    return decoded as JwtPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
}



// jose 임시 작성 함수 = 테스트 예정
export async function sign(payload: JwtPayload):Promise<string> {
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

export async function verify(token: string):Promise<jwt.JwtPayload | null> {
  try {
    const secret_key = process.env.SECRET_KEY;
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret_key));
    return payload as JwtPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
}
