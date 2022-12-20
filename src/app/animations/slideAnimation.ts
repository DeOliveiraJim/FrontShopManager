import {
  animate,
  AnimationQueryOptions,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

const xIntensity = 50;
const yIntensity = 27;

const Direction = {
  Left: [xIntensity, 0],
  Right: [-xIntensity, 0],
  Up: [0, yIntensity],
  Down: [0, -yIntensity],
} as const;

function slideTo(direction: keyof typeof Direction) {
  const options: AnimationQueryOptions = { optional: true };
  return [
    query(
      ':enter, :leave',
      style({ position: 'fixed', width: '100%' }),
      options
    ),
    group([
      query(
        ':enter',
        [
          style({
            transform:
              'translateX(' +
              Direction[direction][0] +
              'px) translateY(' +
              Direction[direction][1] +
              'px)',
            opacity: '0',
          }),
          animate('0.25s ease-in-out', style({})),
        ],
        options
      ),
      query(
        ':leave',
        [
          animate(
            '0.25s ease-in-out',
            style({
              transform:
                'translateX(' +
                -Direction[direction][0] +
                'px) translateY(' +
                -Direction[direction][1] +
                'px)',
              opacity: '0',
            })
          ),
        ],
        options
      ),
    ]),
  ];
}

export const slideInAnimationX = trigger('routeAnimationX', [
  transition(':increment', slideTo('Left')),
  transition(':decrement', slideTo('Right')),
]);

export const slideInAnimationY = trigger('routeAnimationY', [
  transition(':increment', slideTo('Down')),
  transition(':decrement', slideTo('Up')),
]);
