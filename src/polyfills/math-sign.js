export const polyfill = x => (x > 0) - (x < 0) || +x
//垫片
export default Math.sign || polyfill
