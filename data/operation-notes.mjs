/**
 * Hand-written prose for REST operations, keyed by `<module>/<operation-slug>`
 * (the bare slug also works). Without an entry an operation's description just
 * restates its title, which tells a reader nothing.
 *
 * The keys match `docs/restapi/operations/<module>/<slug>.md`.
 *
 * Every field is optional except `summary`:
 *
 *   summary  one sentence: what the endpoint does and what it returns
 *   details  permissions, side effects, pagination, gotchas — omit rather than pad
 *   notes    array of short standalone caveats, rendered as a bullet list
 */
export const OPERATION_NOTES = {}
