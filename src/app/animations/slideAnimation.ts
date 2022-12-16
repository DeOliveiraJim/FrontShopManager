import {
  animate,
  AnimationQueryOptions,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

const Direction = {
  Left: [5, 0],
  Right: [-5, 0],
  Up: [0, 5],
  Down: [0, -5],
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
              '%) translateY(' +
              Direction[direction][1] +
              '%)',
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
                '%) translateY(' +
                -Direction[direction][1] +
                '%)',
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
