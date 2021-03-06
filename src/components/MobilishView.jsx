
/** Simple container that restricts the width to a bit more than mobile. Most
 * (if not all) views should be wrapped in this.
 */
export function MobilishView(props) {
  const { children } = props;
  const style = {width: '100vw', maxWidth: '520px', midWidth: '200px', padding: '14px'};
  if (props.align) {
    style.textAlign = props.align;
  }
  return <div className='mobilish' style={style}>{children}</div>
}
