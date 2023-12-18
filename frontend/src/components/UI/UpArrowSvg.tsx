
type UpArrowSvgType = {
  isOpen?: boolean;
  classNameDefault?: string;
  classNameOpen?: string;
  classNameClose?: string;
}

export default function UpArrowSvg(props:UpArrowSvgType) {
  const { isOpen, classNameDefault, classNameOpen, classNameClose } = props;

  if(isOpen !== undefined) {
    return (
      <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
      className={isOpen ? `${classNameDefault} ${classNameOpen}` : `${classNameDefault} ${classNameClose}`}>
      <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd"></path>
      </svg>
      </>
    )
  }

  return (
    <>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
    className="dark:text-[#eaf0ec]">
    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd"></path>
    </svg>
    </>
  )
}
