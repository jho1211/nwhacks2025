import { Wishlist, Wish } from "@/app/models/models"
import { useRouter } from "next/navigation";
import axios from "@/app/utils/axios_instance";
import "./styles.css"
import { useState } from "react";

export default function WishlistTable(props: {wishlist: Wishlist | undefined, canEdit: boolean}) {
    const [itemName, setItemName] = useState<string>("");
    const [itemUrl, setItemUrl] = useState<string>("");
    const [priority, setPriority] = useState<number>(1);
    const router = useRouter();

    const handleDeleteItem = (item_name: string) => {
        if (!props.wishlist) return;

        const filteredOut = props.wishlist?.wishlist.filter((wish: Wish) => wish.item_name != item_name);
        const newWishlist : Wishlist = {
            uid: props.wishlist.uid,
            wishlist: filteredOut
        };

        axios.put("wishlist", newWishlist)
        .then(resp => {
            props.wishlist = newWishlist;
            alert("Successfully removed wishlist item");
            router.refresh();
        })
        .catch(err => console.log(err));
    }

    const handleAddItem = () => {
        const newItem : Wish = {
            item_name: itemName,
            url: itemUrl,
            priority: priority
        };

        if (props.wishlist) {
            const newWishlist : Wishlist = {
                uid: props.wishlist.uid,
                wishlist: [...props.wishlist.wishlist, newItem]
            };

            axios.put("wishlist", newWishlist)
            .then(resp => {
                props.wishlist = newWishlist;
                alert("Successfully added wishlist item")
                router.refresh();
            })
            .catch(err => console.log(err));
        }
    }

    return (<table className="wishlist-table">
        <thead>
            <tr>
                <td>Item Name</td>
                <td>Item URL</td>
                <td>Priority</td>
                <td></td>
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
                        <td key={`pri-${idx}`}>{wlItem.priority}</td>
                        {props.canEdit ? <td key={`btn-${idx}`}><button className="deleteBtn" onClick={() => handleDeleteItem(wlItem.item_name)}>X</button></td> : null}
                    </tr>)
                }
            )}
        </tbody>
        {props.canEdit ? 
        <tfoot>
            <tr>
                <td><input type="text" placeholder="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} style={{width: "100%"}}></input></td>
                <td><input type="text" placeholder="URL" onChange={(e) => setItemUrl(e.target.value)} style={{width: "100%"}}></input></td>
                <td><input type="number" placeholder="Priority" min={1} max={10} onChange={(e) => setPriority(parseInt(e.target.value))} style={{width: "100%"}}></input></td>
                <td><button type="submit" className="addBtn" onClick={handleAddItem}>+</button></td>
            </tr>
        </tfoot> : null}
    </table>)
}