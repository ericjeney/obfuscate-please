# [obfuscate, please](http://obfuscateplease.com/)

A simple web interface that quickly obfuscates any email address.  It provides four primary options, and allows any combination of the four to be used.

### Encode characters

This option rewrites each letter in the email address in its HTML Entity form.  For example, the letter `A` becomes `&#65;`, etc.  Browsers are perfectly able to interpret this, while many email harvesters cannot.

The address `user@domain.com` becomes `&#117;&#115;&#101;&#114;&#64;&#100;&#111;&#109;&#97;&#105;&#110;&#46;&#99;&#111;&#109;`.

### Insert invisible spans

This option inserts random spans, set to `display:none`, in random positions in the address.  Again, it is easy for the browser to parse these out, but not as easy for bots.

For the address `user@domain.com`, the obfuscation may look like: `us<span style="display:none">fpft</span>er@domain.com`.

### Include mailto link

This option is provided merely for convenience, as it does nothing to obfuscate the address.  It does, however, make the address clickable in a user's browser.

The way it is implemented ensures that the other options do not clobber the URL.  For example, inserting invisible spans in the middle of the `href` tag would cause serious problems.

### Write using Javascript

This option generates a short Javascript snippet that will, when executed, print out the address to the page.  If other obfuscation options are selected, it will print the still-obfuscated address to the page (in other words, the options stack nicely).