import React from 'react'
import { Link } from 'react-router-dom'
import PagesHead from '../PagesHead'
import '../../css/admin.css'

function AdBranch() {
    return (
        <div>
            <PagesHead />
            <div>
                <div className='ad-branch'>
                        <ul>
                            <p>Branches</p>
                            <li><Link>Addis Ketema</Link></li>
                            <li><Link>Bole</Link></li>
                            <li><Link>Kality </Link></li>
                            <li><Link>Megenagna</Link></li>
                            <li><Link>Mekanisa</Link></li>
                        </ul><hr />
                </div>
            </div>
        </div>
    )
}

export default AdBranch