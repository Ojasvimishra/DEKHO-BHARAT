import re
from decimal import Decimal, InvalidOperation

from rest_framework import serializers


class BookingSerializer(serializers.Serializer):
    userName = serializers.CharField(max_length=100, trim_whitespace=True)
    userPhone = serializers.CharField(max_length=20, trim_whitespace=True)
    userEmail = serializers.EmailField(required=False, allow_blank=True)
    city = serializers.CharField(max_length=120, trim_whitespace=True)
    activity = serializers.CharField(max_length=160, trim_whitespace=True)
    price = serializers.CharField(max_length=40, trim_whitespace=True)
    guideName = serializers.CharField(max_length=120, required=False, allow_blank=True)

    def validate_userPhone(self, value):
        if not re.fullmatch(r"[+\d][\d\s()-]{6,19}", value):
            raise serializers.ValidationError("Enter a valid phone number.")
        digits = re.sub(r"\D", "", value)
        if not 7 <= len(digits) <= 15:
            raise serializers.ValidationError("Phone number must contain 7 to 15 digits.")
        return value

    def validate_price(self, value):
        if "-" in value:
            raise serializers.ValidationError("Price must be a non-negative amount.")
        normalized = re.sub(r"[^\d.]", "", value)
        try:
            amount = Decimal(normalized)
        except InvalidOperation as exc:
            raise serializers.ValidationError("Price must contain a valid amount.") from exc
        if not normalized or not amount.is_finite() or amount < 0:
            raise serializers.ValidationError("Price must be a non-negative amount.")
        return value

    def validate(self, attrs):
        for field in ("userName", "city", "activity"):
            if field in attrs and not attrs[field]:
                raise serializers.ValidationError({field: "This field cannot be blank."})
        return attrs

    @staticmethod
    def price_amount(value):
        return float(Decimal(re.sub(r"[^\d.]", "", value)))