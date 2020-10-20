export const scrollToElement = (selector: string, smooth = true) => {
  const el = document.querySelector(`#${selector}`);
  el?.scrollIntoView({ block: 'nearest', behavior: smooth ? 'smooth' : 'auto' });
};
