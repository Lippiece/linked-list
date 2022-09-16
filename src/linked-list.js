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
const toArray
    = currentNode =>
      arrayOfValues => {

        arrayOfValues.push( currentNode.data );
        if ( !currentNode.next ) { return arrayOfValues }

        return toArray( currentNode.next )( arrayOfValues );

      };
/**
 * If the list has no head, return 0, otherwise, return
 * the length of the array
 *
 * @returns The length of the list.
 */
const getSize
  = list => {

    if ( !list.head ) { return 0 }

    return toArray( list.head )( [] ).length;

  };
/**
 * If the list has a head, return a new list with the head's
 * next node as the head and the tail as the tail.
 *
 * @returns A new list with the head removed.
 */
const shift
  = list => {

    if ( !list.head ) { return list }

    return LinkedList( list.head.next )( list.tail );

  };
const pop
  = list => {

    if ( !list.head ) { return list }

    const reversed = reverse( list.head )( emptyList );
    const shifted  = shift( reversed );

    return reverse( shifted.head )( emptyList );

  };
const at
  = list =>
    index => {

      if ( !list.head ) { return "Empty" }

      const arrayOfValues = toArray( list.head )( [] );

      return arrayOfValues[ index ];

    };
const contains
    = list =>
      value => {

        if ( !list.head ) { return false }

        const arrayOfValues = toArray( list.head )( [] );

        return arrayOfValues.includes( value );

      };
const find
    = list =>
      value => {

        if ( !list.head ) { return "Empty" }

        const arrayOfValues = toArray( list.head )( [] );

        return arrayOfValues.indexOf( value );

      };
const toString
    = list => {

      if ( !list.head ) { return "Empty" }

      const arrayOfValues = toArray( list.head )( [] );

      return arrayOfValues.join( " -> " );

    };
const getToStart
    = list =>
      start => {

        if ( start === 0 ) { return list }

        return getToStart( shift( list ) )( start - 1 );

      };
const trimTheEnd
    = list =>
      end => {

        if ( end === 0 ) { return list }

        return trimTheEnd( pop( list ) )( end - 1 );

      };
const slice
    = list =>
      start =>
        end => {

          if ( start <= 0 ) {

            return trimTheEnd( list )( getSize( list ) - end );

          }

          return trimTheEnd( getToStart( list )( start ) )( end - start );

        };
const restoreFrom
    = list =>
      values =>
        currentIndex => {

          if ( currentIndex < 0 ) { return list }
          return restoreFrom( prepend( list )( values[ currentIndex ] ) )( values )( currentIndex - 1 );

        };
const addAt
    = list =>
      index =>
        value => {

          const sliced        = getToStart( list )( index );
          const prepended     = prepend( sliced )( value );
          const whatToRestore = toArray( list.head )( [] )
            .slice( 0, index );

          return restoreFrom( prepended )( whatToRestore )( whatToRestore.length - 1 );

        };
const removeAt
    = list =>
      index => {

        const sliced        = getToStart( list )( index );
        const shifted       = shift( sliced );
        const whatToRestore = toArray( list.head )( [] )
          .slice( 0, index );

        return restoreFrom( shifted )( whatToRestore )( whatToRestore.length - 1 );

      };
const list  = emptyList;
const list2 = prepend( list )( 2 );
const list3 = prepend( list2 )( 1 );
const list4 = append( list3 )( 3 );
const list5 = prepend( list4 )( -123 );
console.log( list5 );
console.log( toString( list5 ) );
const list6 = addAt( list5 )( 3 )( 999 );
console.log( toString( removeAt(list6)(7) ) );
