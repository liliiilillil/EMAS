import { request, sha1 } from '@terminus/mall-utils';

export async function login(identify, password, captchaData = {}) {
  return await request('/api/user/web/login/buyer/identify', {
    method: 'POST',
    data: { password: sha1(password), identify, ...captchaData },
    quiet: true,
  });
}
