import gsap from "gsap";

export function slidingComponents<T>(currentView: T, view: T): T {
  gsap.to(`#${currentView}`, {
    opacity: 0, x: -200, ease: 'power2.inOut', duration: 0.3, onComplete: () => {
      console.log("Are you here?");

      gsap.set(`#${currentView}`, { display: 'none', opacity: 1, x: 0 });
      currentView = view;
      gsap.set(`#${currentView}`, { display: 'block' });
      gsap.from(`#${currentView}`, { opacity: 0, x: 200, duration: 0.3, ease: 'power2.inOut' });
    }
  });
  return view;

}