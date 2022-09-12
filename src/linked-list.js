class LinkedList {

/**
 * It returns an object with two properties, head
 * and tail, both undefined
 */
const LinkedList
  = head =>
    tail =>
      ( {
        head,
        tail,
      } );
/**
 * It takes a data and returns an object
 * with a next property set to undefined and a data property
 * set to the data passed in
 */
const ListNode
  = data =>
    next =>
      ( {
        data,
        next,
      } );
/**
 * The method creates a node and prepends it at the beginning of the list.
 *
 * @param list - the list to prepend to
 * @param data - the data to add to the list
 * @returns A new list with the data prepended to the beginning.
 */
const prepend
  = list =>
    data =>
      LinkedList( ListNode( data )( list.head ) )( list.head );

    this.head = undefined;
    this.tail = undefined;

  }

}
