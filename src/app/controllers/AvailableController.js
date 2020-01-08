import AvailableService from '../services/AvailableService';

class AvailableController {
  async index(req, res) {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: 'Invalid date' });
    }

    // Date in format timestamp, with possibility of use in 2 formats
    const searchDate = Number(date);

    const available = await AvailableService.run({
      date: searchDate,
      provider_id: req.params.providerId,
    });

    return res.json(available);
  }
}

export default new AvailableController();
