import { Wishlist, Wish } from "@/app/models/models"
import "./styles.css"

export default function WishlistTable(props: {wishlist: Wishlist | undefined}) {
    return (<table className="wishlist-table">
        <thead>
            <tr>
                <td>Item Name</td>
                <td>Item URL</td>
                <td>Priority</td>
            </tr>
        </thead>
        <tbody>
            {props.wishlist?.wishlist.map(
                (wlItem: Wish, idx: number) => {
                    return (
                    <tr key={`row-${idx}`}>
                        <td key={`name-${idx}`}>{wlItem.item_name}</td>
                        <td key={`url-${idx}`}>
                            <a className="item-link" href={wlItem.url}>{wlItem.url}</a>
                        </td>
                        <td key={`pri-${idx}`}>{wlItem.priority}</td></tr>)
                }
            )}
        </tbody>
    </table>)
}