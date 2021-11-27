
/** Simple container that restricts the width to a bit more than mobile. Most
 * (if not all) views should be wrapped in this.
 */
export function MobilishView({children}) {
  return <div className='mobilish' style={{maxWidth: '520px', midWidth: '200px'}}>{children}</div>
}
