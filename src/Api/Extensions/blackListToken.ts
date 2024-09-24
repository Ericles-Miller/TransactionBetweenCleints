import jwt from 'jsonwebtoken';

interface BlacklistEntry {
  token: string;
  exp: number;
}

export let tokenBlacklist: BlacklistEntry[] = [];


export class BlackListToken {
  addTokenBlackList(token: string) : void {
    const decoded = jwt.decode(token);
    if (decoded && typeof decoded === 'object' && 'exp' in decoded) {
      const exp = decoded.exp as number;
      tokenBlacklist.push({ token, exp });
    }
  }

  removeExpTokens() {
    const agora = Math.floor(Date.now() / 1000);
    tokenBlacklist = tokenBlacklist.filter(entry => entry.exp > agora);
}

}