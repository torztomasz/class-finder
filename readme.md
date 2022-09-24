# Class finder by Tomasz Tórz
An implementation of a class finder functionality.

## Functionality

### Searching by capital letters
You can search class names by typing only capital letters.

    "FB" finds c.d.FooBar and a.b.FooBarBaz
    "BB" finds a.b.FooBarBaz
    "FBB" finds a.b.FooBarBaz 
    
### Searching by capital and small letters
You can use small letters between capital letters to narrow down the search results.

    "FoBa" finds c.d.FooBar but not c.d.FooBer

### Searching by only small letters
Searching using only small letters is treated like searching using only capital letters.
 
### Searching by word with space at the end
Using space at the end of a search pattern makes sure that the last word of search pattern is also the last word of class name.

    "FB " finds c.d.FooBar
    "BB " finds a.b.FooBarBaz
    "B " finds c.d.FooBar

### Searching by word with wildcard characters
You can use wildcard character to match missing letters. Those can only be used in place of small letters

    "Fo*Bar" finds c.d.FooBar, b.c.FordBar, a.b.FosBarBaz
    "Fo**Bar" finds b.c.FordBar

