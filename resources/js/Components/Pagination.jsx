import '../../css/deletebutton.css'
export default function Pagination({links}) {
    return (
        <div className="mt-4">
        {links && (
            <ul className="pagination">
                {links.map((link, index) => (
                    <li
                        key={index}
                        className={`page-item ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''}`}
                    >
                        <a
                            href={link.url || '#'}
                            className="page-link"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        ></a>
                    </li>
                ))}
            </ul>
        )}
    </div>
    );
}
