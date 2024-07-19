<div class="badge bg-secondary">
    {{ \Carbon\Carbon::parse($row->created_at)->translatedFormat('jS M, Y') }}
</div>
