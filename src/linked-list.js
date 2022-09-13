const LinkedList
  = head =>
    tail =>
      ( {
        head,
        tail: tail || head,
      } );
const emptyList = LinkedList()();
const ListNode
  = data =>
    next =>
      ( {
        data,
        next,
      } );
/**
 * @param currentNode {ListNode} - the node to start from
 * @returns the last node in the linked list
 */
const findLast
  = currentNode => {

    try {

      return findLast( currentNode.head.next );

    } catch { return currentNode }

  };
/**
 * It takes a list and a data value, and returns a new
 * list with the data value prepended to the original list
 *
 * @param list {LinkedList} - the list to prepend to
 * @param data {*} - the data to prepend
 * @returns A new list with the new head and the updated tail.
 */
const prepend
  = list =>
    data => {

      if ( !list.head ) {

        // returning a new list with the same head and tail
        return LinkedList( ListNode( data )() )( ListNode( data )() );

      }

      // returning a new list with the new head and the updated tail
      return LinkedList(
        ListNode( data )( list.head )
      )(
        findLast( list.tail )
      );

    };
/**
 * It takes a list and an iterator node, and returns a new
 *
 * @param currentNode {ListNode} - the node to start from
 * @param listIterator {LinkedList} - the sample list going through the nodes
 * @returns A list iterator
 */
const reverse
  = list =>
    listIterator => {

      // if the list is empty, return the list iterator
      if ( !list.next ) { return prepend( listIterator )( list.data ) }

      /**
       * if the list is not empty, prepend the data of
       * the current node to the list iterator
       * */
      return reverse(
        list.next
      )(
        prepend( listIterator )( list.data )
      );

    };
const append
  = list =>
    toAdd => {

      if ( !list.head ) {

        return prepend( list )( toAdd );

      }

      const reversed  = reverse( list.head )( emptyList );
      const prepended = prepend( reversed )( toAdd );

      return reverse( prepended.head )( emptyList );

    };
const print
    = currentNode =>
      arrayOfValues => {

        arrayOfValues.push( currentNode.data );
        if ( !currentNode.next ) { return arrayOfValues }

        return print( currentNode.next )( arrayOfValues );

      };
const list  = emptyList;
const list2 = prepend( list )( 2 );
const list3 = prepend( list2 )( 1 );
const list4 = append( list3 )( 3 );
const list5 = prepend( list4 )( -123 );
console.log( list5 );
console.log( print( list5.head )( [] ) );
