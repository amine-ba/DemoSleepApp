export default (duration_in_bed: string, duration_asleep: string) =>
  Math.round((100 * Number(duration_asleep)) / Number(duration_in_bed));
