import bleach

ALLOWED_TAGS = ['a', 'code', 'i', 'strong']
ALLOWED_ATTRS = {
    'a': ['href', 'title']
}


def sanitize_html(text):
    return bleach.clean(text, tags=ALLOWED_TAGS, attributes=ALLOWED_ATTRS)