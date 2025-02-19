from rest_framework.throttling import UserRateThrottle

class BurstRateThrottle(UserRateThrottle):
    scope = 'burst'  # Custom scope for burst rate

class SustainedRateThrottle(UserRateThrottle):
    scope = 'sustained'  # Custom scope for sustained rate
    