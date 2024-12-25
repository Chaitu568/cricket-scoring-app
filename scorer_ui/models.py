from django.db import models

class ClickEvent(models.Model):
    button_name = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.button_name} clicked at {self.timestamp}"
